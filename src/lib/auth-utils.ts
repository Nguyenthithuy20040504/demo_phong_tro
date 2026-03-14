import ToaNha from '@/models/ToaNha';
import Phong from '@/models/Phong';
import HopDong from '@/models/HopDong';
import mongoose from 'mongoose';

/**
 * Lấy danh sách ID Tòa Nhà mà User hiện tại được phép truy cập.
 * - Admin: null (truy cập tất cả)
 * - Chủ Nhà: Các tòa nhà có chuSoHuu là mình
 * - Nhân Viên: Các tòa nhà có mảng nguoiQuanLy chứa ID mình
 * - Khách Thuê: Rỗng (sẽ dùng logic lọc theo Hợp đồng riêng)
 * 
 * @param user Đối tượng user từ session.user
 * @returns Array ObjectId hoặc null (nếu là Admin)
 */
export async function getAccessibleToaNhaIds(user: any): Promise<mongoose.Types.ObjectId[] | null> {
  if (!user || user.role === 'khachThue') {
    return [];
  }

  if (user.role === 'admin') {
    return null; // Null đại diện cho việc query toàn bộ
  }

  let toaNhas = [];
  try {
    if (user.role === 'chuNha') {
      toaNhas = await ToaNha.find({ chuSoHuu: user.id }).select('_id');
    } else if (user.role === 'nhanVien') {
      toaNhas = await ToaNha.find({ nguoiQuanLy: user.id }).select('_id');
    }
    
    return toaNhas.map(tn => tn._id);
  } catch (error) {
    console.error('Error fetching accessible ToaNha ids:', error);
    return [];
  }
}

/**
 * Lấy danh sách ID Khách Thuê thông qua Hợp Đồng nằm trong Tòa Nhà mà user dc phép quản lý
 */
export async function getAccessibleKhachThueIds(user: any): Promise<mongoose.Types.ObjectId[] | null> {
  const toaNhaIds = await getAccessibleToaNhaIds(user);
  
  if (toaNhaIds === null) {
    return null; // Admin
  }
  
  if (toaNhaIds.length === 0) {
    return [];
  }

  try {
    const phongs = await Phong.find({ toaNha: { $in: toaNhaIds } }).select('_id');
    const phongIds = phongs.map(p => p._id);

    const hopDongs = await HopDong.find({ phong: { $in: phongIds } }).select('khachThueId');
    
    // Flatten the array of arrays
    const khachThueIds = hopDongs.reduce((acc, hd) => {
      return acc.concat(hd.khachThueId || []);
    }, []);

    // Remove duplicates
    const uniqueIds = Array.from<string>(new Set(khachThueIds.map((id: any) => id.toString())))
      .map((idStr: string) => new mongoose.Types.ObjectId(idStr));

    return uniqueIds;
  } catch (error) {
    console.error('Error fetching accessible KhachThue ids:', error);
    return [];
  }
}

