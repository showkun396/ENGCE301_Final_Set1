# ENGCE301 Final Project – Microservices Task Board

## ผู้จัดทำ

สมาชิก 1 :
ชื่อ – นามสกุล : นาย ภูมิรพี กาวันนา
รหัสนักศึกษา : 67543206018-3

สมาชิก 2 :
ชื่อ – นามสกุล : นาย เตชธรรม วงศ์ษา
รหัสนักศึกษา : 67543206052-2

รายวิชา : ENGCE301 Web Application Development

---

# ภาพรวมโปรเจค

โปรเจคนี้เป็นระบบ **Task Management Board** ที่พัฒนาโดยใช้แนวคิด **Microservices Architecture**
ระบบถูกแบ่งออกเป็นหลาย Service เพื่อให้แต่ละส่วนสามารถทำงานแยกจากกันได้อย่างอิสระ

ระบบประกอบด้วย

* Auth Service (ระบบยืนยันตัวตนผู้ใช้)
* Task Service (ระบบจัดการงาน)
* Log Service (ระบบบันทึกเหตุการณ์)
* Nginx Gateway (ทำหน้าที่เป็น Reverse Proxy และ HTTPS)
* Frontend (หน้าเว็บสำหรับใช้งาน)

การเชื่อมต่อทั้งหมดจะถูกจัดการผ่าน **Nginx Gateway** และระบบรองรับการใช้งานผ่าน **HTTPS**

---

# สถาปัตยกรรมระบบ

Frontend
↓
Nginx (HTTPS Gateway)
↓
Auth Service | Task Service | Log Service
↓
Database (SQLite)

คำอธิบาย

* Frontend ใช้สำหรับแสดงผลและเรียก API
* Nginx ทำหน้าที่เป็น Reverse Proxy
* Auth Service ใช้สำหรับ Login และสร้าง Token
* Task Service ใช้สำหรับจัดการ Task
* Log Service ใช้สำหรับเก็บ Event Log

---

# เทคโนโลยีที่ใช้

* Node.js
* Express.js
* SQLite
* Docker
* Docker Compose
* Nginx
* JWT Authentication
* HTML / JavaScript

---

# โครงสร้างโปรเจค

```
final-project
│
├── nginx
│   ├── nginx.conf
│   └── cert
│       ├── cert.pem
│       └── key.pem
│
├── auth-service
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
├── task-service
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
├── log-service
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
├── frontend
│   ├── index.html
│   └── app.js
│
└── docker-compose.yml
```

---

# การทำงานของแต่ละ Service

## 1. Auth Service

Auth Service ทำหน้าที่เกี่ยวกับระบบยืนยันตัวตนของผู้ใช้งาน

ฟังก์ชันหลัก

* Register ผู้ใช้ใหม่
* Login ผู้ใช้
* สร้าง JWT Token

API ที่ใช้

POST /auth/login
POST /auth/register

เมื่อผู้ใช้ Login สำเร็จ ระบบจะส่ง **JWT Token** กลับไปให้ Frontend เพื่อใช้ในการเรียก API อื่น

---

## 2. Task Service

Task Service ใช้สำหรับจัดการข้อมูล Task ของผู้ใช้

ฟังก์ชันหลัก

* สร้าง Task
* ดู Task
* แก้ไข Task
* ลบ Task

API

GET /tasks
POST /tasks
PUT /tasks/:id
DELETE /tasks/:id

---

## 3. Log Service

Log Service ใช้สำหรับเก็บข้อมูลเหตุการณ์ที่เกิดขึ้นในระบบ เช่น

* LOGIN_SUCCESS
* TASK_CREATED
* TASK_DELETED

API

POST /logs
GET /logs

Log จะถูกบันทึกพร้อม timestamp

---

# HTTPS Gateway

Nginx ถูกใช้เป็น Reverse Proxy เพื่อ

* จัดการ HTTPS
* กระจาย Request ไปยัง Service ต่าง ๆ

Route ที่กำหนดไว้

/auth → Auth Service
/tasks → Task Service
/logs → Log Service

---

# Database

ระบบใช้ **SQLite** เป็นฐานข้อมูล

ตารางที่ใช้

## users

* id
* username
* password

## tasks

* id
* title
* status
* user_id

## logs

* id
* event
* timestamp

---

# วิธีรันระบบ

## 1. Clone Project

```
git clone <repository-url>
cd final-project
```

---

## 2. สร้าง SSL Certificate

```
openssl req -x509 -nodes -days 365 \
-newkey rsa:2048 \
-keyout key.pem \
-out cert.pem
```

นำไฟล์ไปใส่ใน

```
nginx/cert/
```

---

## 3. Run Docker Compose

```
docker-compose up --build
```

ระบบจะเริ่มทำงานทั้งหมด

* nginx
* auth-service
* task-service
* log-service

---

## 4. เข้าใช้งานระบบ

เปิด Browser

```
https://localhost
```

---

# ตัวอย่างการทดสอบ API

## Login

```
POST /auth/login
```

Body

```
{
 "username":"test",
 "password":"1234"
}
```

---

## Create Task

```
POST /tasks
```

Body

```
{
 "title":"Finish Final Project"
}
```

---

# ผลลัพธ์ที่ได้

ระบบสามารถ

* Login ผู้ใช้
* จัดการ Task
* บันทึก Log
* ทำงานผ่าน HTTPS
* รันด้วย Docker Compose

ซึ่งสอดคล้องกับแนวคิด **Microservices Architecture**

---

# สรุป

โปรเจคนี้แสดงการพัฒนา Web Application แบบ Microservices
โดยแยก Service ออกเป็นส่วนย่อย ทำให้ระบบสามารถขยายและจัดการได้ง่ายขึ้น

นอกจากนี้ยังมีการใช้

* Docker เพื่อจัดการ Environment
* Nginx สำหรับ Reverse Proxy
* HTTPS เพื่อเพิ่มความปลอดภัย

ซึ่งเป็นแนวทางที่ใช้ในระบบ Web Application จริงในปัจจุบัน
