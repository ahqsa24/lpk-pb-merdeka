# Debug SuperAdmin Issue

## Langkah-langkah Troubleshooting

### 1. Cek Role di Database
Buka browser dan akses: `http://localhost:3000/api/debug/users`

Cari user dengan ID 1, pastikan `role` nya adalah `"superAdmin"` (bukan `"admin"`).

### 2. Clear Browser Cache & Storage
Buka browser console (F12) dan jalankan:

```javascript
// Clear semua data login
localStorage.clear();
sessionStorage.clear();

// Atau lebih spesifik:
localStorage.removeItem('token');
localStorage.removeItem('user');

// Reload halaman
window.location.reload();
```

### 3. Login Ulang
1. Setelah clear storage, halaman akan redirect ke home
2. Klik "Login" 
3. Masukkan email dan password user ID 1
4. Seharusnya redirect ke `/admin/dashboard`

### 4. Verifikasi Token
Setelah login, cek token di console:

```javascript
// Ambil token
const token = localStorage.getItem('token');
console.log('Token:', token);

// Decode token (copy token dan paste di jwt.io)
// Atau gunakan:
const payload = JSON.parse(atob(token.split('.')[1]));
console.log('Token Payload:', payload);
// Pastikan role: "superAdmin"
```

### 5. Cek User Data
```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log('User Data:', user);
// Pastikan role: "superAdmin"
```

## Jika Masih Belum Berhasil

### Opsi A: Manual Update via Prisma Studio
```bash
npx prisma studio
```
1. Buka tabel `users`
2. Cari user yang ingin dijadikan superAdmin
3. Edit field `role` menjadi `superAdmin` (huruf kecil semua kecuali A)
4. Save
5. Clear browser storage dan login ulang

### Opsi B: Via SQL Direct
```sql
-- Cek role saat ini
SELECT id, name, email, role FROM users WHERE id = 1;

-- Update ke superAdmin
UPDATE users SET role = 'superAdmin' WHERE id = 1;

-- Verifikasi
SELECT id, name, email, role FROM users WHERE id = 1;
```

### Opsi C: Cek Login Response
Buka Network tab di browser (F12 > Network):
1. Login dengan user
2. Cari request ke `/api/auth/login`
3. Lihat Response
4. Pastikan `user.role` adalah `"superAdmin"`

## Expected Behavior

Setelah login sebagai superAdmin:
- ✅ Redirect ke `/admin/dashboard` (bukan `/dashboard`)
- ✅ Sidebar menampilkan menu admin lengkap
- ✅ Menu "Admins" tersedia di grup "Management"
- ✅ Bisa create/edit/delete admin lain

## Common Issues

### Issue 1: Role masih "admin" di database
**Solution**: Jalankan ulang `set-superadmin.sql` atau update manual via Prisma Studio

### Issue 2: Token lama masih tersimpan
**Solution**: Clear localStorage dan login ulang

### Issue 3: Typo di role name
**Solution**: Pastikan role adalah `superAdmin` (bukan `super_admin`, `SuperAdmin`, atau `SUPERADMIN`)

### Issue 4: Cache browser
**Solution**: Hard refresh (Ctrl+Shift+R) atau buka Incognito mode

## Quick Fix Script

Jalankan di browser console setelah login:

```javascript
// Force logout dan clear
localStorage.clear();
window.location.href = '/auth/login';
```
