import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '../../../../lib/mongodb';
import HopDong from '../../../../models/HopDong';
import HoaDon from '../../../../models/HoaDon';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'chuNha')) {
      return NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 403 });
    }

    const { thang, nam } = await req.json();

    if (!thang || !nam) {
      return NextResponse.json({ error: 'Thiếu thông tin tháng, năm' }, { status: 400 });
    }

    await dbConnect();

    // Tìm tất cả hợp đồng đang còn hiệu lực
    const hopDongs = await HopDong.find({ trangThai: 'dangHieuLuc' });
    if (!hopDongs || hopDongs.length === 0) {
      return NextResponse.json({ message: 'Không có hợp đồng nào đang hiệu lực để tạo hóa đơn', count: 0 }, { status: 200 });
    }

    let taoMoiCount = 0;
    
    // Tạo hạn thanh toán: Mặc định là ngày 5 của tháng kế tiếp
    const hanThanhToan = new Date(nam, thang, 5); // thang trong JS Date là (tháng thực tế - 1) + 1 = tháng thực tế

    for (const hd of hopDongs) {
      // 1. Kiểm tra hóa đơn tháng này của hợp đồng này đã tồn tại chưa
      const existingHoaDon = await HoaDon.findOne({
        hopDong: hd._id,
        thang: thang,
        nam: nam
      });

      if (existingHoaDon) {
        continue;
      }

      // 2. Tạo Mã Hóa Đơn ngẫu nhiên HD-MMYY-XXXX
      const maHoaDon = `HD${String(thang).padStart(2, '0')}${String(nam).slice(2)}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // 3. Lọc ra các Dịch Vụ cố định để nạp vào Hóa đơn (trừ Điện Nước)
      const phiDichVuCocDien = hd.dichVu.map((dv: any) => ({
        ten: dv.ten,
        gia: dv.gia
      }));

      // Chú ý: Điện và Nước bắt đầu = 0, Quản lý phải nhập thủ công sau để chốt số
      const newHoaDon = new HoaDon({
        maHoaDon,
        hopDong: hd._id,
        phong: hd.phong,
        khachThue: hd.nguoiDaiDien,
        thang: thang,
        nam: nam,
        tienPhong: hd.tienPhong,
        tienDien: 0,
        soDien: 0,
        chiSoDienBanDau: 0, // Admin cần cập nhật
        chiSoDienCuoiKy: 0, // Admin cần cập nhật
        tienNuoc: 0,
        soNuoc: 0,
        chiSoNuocBanDau: 0, // Admin cần cập nhật
        chiSoNuocCuoiKy: 0, // Admin cần cập nhật
        phiDichVu: phiDichVuCocDien,
        tongTien: hd.tienPhong + phiDichVuCocDien.reduce((sum: number, item: any) => sum + item.gia, 0),
        daThanhToan: 0,
        conLai: hd.tienPhong + phiDichVuCocDien.reduce((sum: number, item: any) => sum + item.gia, 0),
        trangThai: 'chuaThanhToan',
        hanThanhToan: hanThanhToan,
      });

      await newHoaDon.save();
      taoMoiCount++;
    }

    return NextResponse.json({
      message: `Đã tạo thành công ${taoMoiCount} hóa đơn cho tháng ${thang}/${nam}.`,
      count: taoMoiCount
    }, { status: 200 });

  } catch (error: any) {
    console.error('Lỗi khi tạo hóa đơn hàng loạt:', error);
    return NextResponse.json({ error: error.message || 'Lỗi server' }, { status: 500 });
  }
}
