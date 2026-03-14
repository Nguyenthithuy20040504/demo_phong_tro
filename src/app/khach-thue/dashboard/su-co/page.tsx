'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Wrench, MessageSquare, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function SuCoKhachThuePage() {
  useEffect(() => {
    document.title = 'Báo cáo Sự cố - Khách thuê';
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Báo cáo sự cố</h1>
        <p className="text-gray-600">Quản lý và theo dõi các yêu cầu hỗ trợ sửa chữa</p>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                Danh sách sự cố
              </CardTitle>
              <CardDescription>
                Theo dõi tiến độ xử lý các vấn đề bạn đã báo cáo
              </CardDescription>
            </div>
            <Button>
              <Wrench className="h-4 w-4 mr-2" />
              Báo cáo sự cố mới
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4">
            <div className="bg-blue-50 p-6 rounded-full mb-6">
              <AlertCircle className="h-16 w-16 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Chưa có sự cố nào</h2>
            <p className="text-gray-500 max-w-md">
              Hiện tại phòng của bạn không có sự cố nào cần hỗ trợ xử lý. Bạn có thể nhấn nút <strong>"Báo cáo sự cố mới"</strong> nếu phòng gặp vấn đề về điện, nước, hoặc trang thiết bị.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary/5 border-none shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">1. Gửi Yêu Cầu</h3>
            <p className="text-sm text-muted-foreground">Mô tả chi tiết và đính kèm ảnh chụp sự cố</p>
          </CardContent>
        </Card>
        
        <Card className="bg-primary/5 border-none shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">2. Chờ Xác Nhận</h3>
            <p className="text-sm text-muted-foreground">Quản lý sẽ tiếp nhận và lên lịch sửa chữa</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-none shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">3. Xử Lý Xong</h3>
            <p className="text-sm text-muted-foreground">Đội ngũ kỹ thuật khắc phục và đóng sự cố</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
