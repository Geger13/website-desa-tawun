/**
 * CITIZEN FORMS MODULE
 * Handles E-Surat permohonan and Lapor aduan submissions with validation, tracking codes & toast feedback
 */

import { showToast } from './toast.js';
import { closeModal } from './modal.js';

export function initForms() {
  const suratForm = document.getElementById('formPengajuanSurat');
  const laporForm = document.getElementById('formLaporWarga');

  // 1. E-Surat Permohonan Form
  if (suratForm) {
    suratForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nikInput = document.getElementById('nikPemohon');
      const namaInput = document.getElementById('namaPemohon');
      const jenisInput = document.getElementById('jenisSurat');
      const waInput = document.getElementById('waPemohon');

      const nik = nikInput?.value?.trim() || '';
      const nama = namaInput?.value?.trim() || '';
      const jenis = jenisInput?.value || '';
      const wa = waInput?.value?.trim() || '';

      if (nik.length < 16) {
        showToast({
          type: 'warning',
          title: 'NIK Tidak Valid',
          message: 'Mohon masukkan Nomor Induk Kependudukan (NIK) 16 digit yang sah.'
        });
        nikInput?.focus();
        return;
      }

      if (!nama) {
        showToast({
          type: 'warning',
          title: 'Nama Wajib Diisi',
          message: 'Mohon lengkapi nama lengkap sesuai KTP.'
        });
        namaInput?.focus();
        return;
      }

      if (!wa) {
        showToast({
          type: 'warning',
          title: 'Nomor WhatsApp Wajib Diisi',
          message: 'Mohon masukkan nomor WhatsApp aktif untuk notifikasi dokumen.'
        });
        waInput?.focus();
        return;
      }

      const resiCode = `TWN-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

      showToast({
        type: 'success',
        title: 'Permohonan Surat Diterima!',
        message: `Nomor Resi: ${resiCode}\nLayanan: ${jenis}\nPemohon: ${nama}\nPetugas Balai Desa Tawun akan memverifikasi dan menghubungi via WhatsApp (${wa}).`,
        duration: 7000
      });

      suratForm.reset();
      closeModal();
    });
  }

  // 2. Lapor & Pengaduan Warga Form
  if (laporForm) {
    laporForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const judulInput = document.getElementById('judulLaporan');
      const isiInput = document.getElementById('isiLaporan');

      const judul = judulInput?.value?.trim() || '';
      const isi = isiInput?.value?.trim() || '';

      if (!judul) {
        showToast({
          type: 'warning',
          title: 'Judul Wajib Diisi',
          message: 'Mohon berikan ringkasan perihal aduan Anda.'
        });
        judulInput?.focus();
        return;
      }

      const ticketId = `LAPOR-TWN-${Math.floor(1000 + Math.random() * 9000)}`;

      showToast({
        type: 'success',
        title: 'Aduan Berhasil Terkirim!',
        message: `Tiket ID: ${ticketId}\nPerihal: "${judul}"\nTim Pelayanan & Keamanan Wilayah Desa Tawun akan menindaklanjuti dalam 1x24 jam.`,
        duration: 7000
      });

      laporForm.reset();
      closeModal();
    });
  }
}
