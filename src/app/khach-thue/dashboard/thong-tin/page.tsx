'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Phone, Mail, MapPin, Building, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ThongTinKhachThuePage() {
  const { data: session } = useSession();
  const user = session?.user as any;

  useEffect(() => {
    document.title = 'Hồ sơ Cá nhân - Khách thuê';
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
        <p className="text-gray-600">Xem và quản lý thông tin bảo mật tài khoản</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột trái: Ảnh đại diện & Thông tin số liên lạc */}
        <div className="md:col-span-1 space-y-6">
          <Card className="border-none shadow-md overflow-hidden text-center items-center">
            <div className="h-24 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            <CardContent className="px-6 pb-6 pt-0 relative pb-4">
              <div className="absolute top-[-3rem] left-1/2 transform -translate-x-1/2 mt-0 border-4 border-white h-24 w-24 bg-indigo-100 rounded-full flex items-center justify-center text-4xl font-bold text-indigo-600 uppercase shadow-sm">
                {user?.name?.charAt(0) || 'K'}
              </div>
              <div className="pt-14 mt-4">
                <h2 className="text-xl font-bold text-gray-900">{user?.name || 'Khách thuê'}</h2>
                <div className="flex items-center justify-center gap-2 mt-2 text-sm text-green-600 font-medium">
                  <ShieldCheck className="h-4 w-4" /> Tài khoản đã xác thực
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Bảo mật & Liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-full"><Mail className="h-4 w-4 text-blue-600" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium truncate">{user?.email || 'Chưa cập nhật'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-full"><Phone className="h-4 w-4 text-blue-600" /></div>
                <div>
                  <p className="text-xs text-muted-foreground">Số điện thoại</p>
                  <p className="text-sm font-medium">{user?.phone || 'Chưa cập nhật'}</p>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">Đổi mật khẩu</Button>
            </CardContent>
          </Card>
        </div>

        {/* Cột phải: Thông tin Đăng ký Tạm trú, Hợp đồng... */}
        <div className="md:col-span-2">
          <Card className="border-none shadow-md min-h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Hồ sơ lưu trú
              </CardTitle>
              <CardDescription>
                Thông tin được Chủ nhà đăng ký xác thực tạm trú tại khu trọ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center min-h-[30vh] text-center px-4">
                <div className="bg-gray-50 p-6 rounded-full border border-dashed border-gray-200 mb-6">
                  <Building className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">Chưa số hóa dữ liệu cư dân</h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Chủ quản lý chưa cập nhật hợp đồng CMND/CCCD hoặc Giấy phép tạm trú của bạn lên hệ thống điện toán đám mây.
                </p>
                <Button className="mt-6">Yêu cầu bổ sung hồ sơ</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
