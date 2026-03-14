"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon, LogIn, Sparkles, Building2, Users2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] selection:bg-primary/10 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-400/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-24 lg:py-32 max-w-7xl">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="size-3" /> System Version 2.0
            </span>
          </motion.div>

          {/* Hero Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-serif italic tracking-tight text-foreground mb-8 leading-[0.95]"
          >
            Quản lý <br />
            <span className="text-primary pr-4">lưu trú</span> 
            đỉnh cao
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground/80 mb-12 max-w-2xl font-light tracking-wide leading-relaxed"
          >
            Giải pháp vận hành nhà trọ thông minh, mang lại trải nghiệm 
            biên tập tinh tế cho cả chủ sở hữu và cư dân.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 mb-24 w-full sm:w-auto">
            <Link href="/dang-nhap" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto px-10 h-16 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] shadow-premium hover:shadow-premium-hover transition-all">
                <LogIn className="size-4 mr-3" />
                Vào trung tâm điều khiển
              </Button>
            </Link> 
            <Link href="/xem-phong" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-10 h-16 rounded-2xl bg-background/50 backdrop-blur-xl border-border/40 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-secondary/50">
                <HomeIcon className="size-4 mr-3" />
                Khám phá không gian
              </Button>
            </Link>
          </motion.div>

          {/* Feature Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
          >
            {[
              { icon: Building2, title: "Kiến trúc hệ thống", desc: "Quản lý tòa nhà và hạ tầng với độ chính xác tuyệt đối." },
              { icon: Users2, title: "Cộng đồng cư dân", desc: "Kết nối và thấu hiểu nhu cầu của từng khách hàng." },
              { icon: ShieldCheck, title: "Bảo mật đa tầng", desc: "Dữ liệu được bảo vệ bởi các giao thức mã hóa quân đội." }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="group p-8 rounded-[2rem] bg-secondary/5 border border-border/10 backdrop-blur-2xl hover:bg-secondary/10 transition-all duration-500 text-left"
              >
                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="size-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-muted-foreground/70 leading-relaxed leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Footer Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border/40 to-transparent" />
    </div>
  );
}
