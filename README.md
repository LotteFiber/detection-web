# HelmetSys

Web application, Mobile application, OCR program for scanning student cards and motorcycle license plates. For students who do not wear helmets or violate the traffic rules of Naresuan University

## Technology 

- [Web application: React]
- [Mobile application: Flutter]
- [Backend API: Express]
- [Database: MongoDB]
- [MQTT connection: Paho MQTT]
- [OCR program: Python]
- [OCR extraction: YOLO and EasyOCR]
- [OCR model: NU vision lab]
## Getting Started
Each folder must be installed as follows.

### detection_web
- `npm install`
- `npm start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000)

### UI screenshot

- หน้าเว็บ Login และ Signup เข้าสู่ระบบ
<img src="https://github.com/user-attachments/assets/a41f541a-f4ab-41c6-b220-6ad944fdc170">

- หน้าเว็บ Dashboard แสดงถึงข้อมูลสถิติ กราฟ จำนวนผู้ขับขี่รถจักรยานยนต์ไม่สวมหมวกนิรภัย 
<img src="https://github.com/user-attachments/assets/6ddf6a94-bc16-4425-ad55-e5fa43101c65">

- หน้าเว็บแสดงข้อมูลของป้ายทะเบียนที่ระบบตรวจจับหมวกนิรภัยได้พบจากไฟล์ภาพ หรือวิดีโอที่อัปโหลด
<img src="https://github.com/user-attachments/assets/16d7df52-b9f2-4fc0-8904-9d7177b506e1">

- ใช้สำหรับเพิ่มข้อมูลนิสิต ชื่อ นามสกุล รหัสนิสิต คณะ และข้อมูลป้ายทะเบียนทั้ง 3 ส่วนเก็บเข้าฐานข้อมูล เพื่อระบบจะใช้ในการเปรียบเทียบข้อมูลผู้ที่ขับขี่รถจักรยานยนต์ไม่สวมหมวกนิรภัย
<img src="https://github.com/user-attachments/assets/4cd1f1c9-1deb-47aa-8ebc-efc0babd4ad5">

- ใช้สำหรับอัพโหลดไฟล์วิดีโอเพื่อนำไปประมวลผล ในระบบตรวจจับหมวกนิรภัย
<img src="https://github.com/user-attachments/assets/35979065-2383-4504-9ba1-73e18874ff9c">
