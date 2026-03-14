'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function HoaDonKhachThuePage() {
  useEffect(() => {
    document.title = 'Hóa đơn - Khách thuê';
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý hóa đơn</h1>
        <p className="text-gray-600">Theo dõi và thanh toán các hóa đơn hàng tháng</p>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Lịch sử giao dịch
              </CardTitle>
              <CardDescription>
                Danh sách toàn bộ biên lai tiền phòng và dịch vụ của bạn
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Lọc
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Xuất file
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4">
            <div className="bg-blue-50 p-6 rounded-full mb-6">
              <FileText className="h-16 w-16 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Chưa có hóa đơn nào</h2>
            <p className="text-gray-500 max-w-md">
              Hệ thống hiện chưa tự động tạo ra Hóa đơn thu tiền phòng mới nhất cho tài khoản của bạn. Hóa đơn sẽ hiển thị tại đây khi tới hạn thanh toán tháng tới.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
