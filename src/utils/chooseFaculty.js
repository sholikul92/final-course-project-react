export const chooseFaculty = (prody) => {
  switch (prody) {
    case 'Ekonomi':
    case 'Manajemen':
    case 'Akuntansi':
      return 'Fakultas Ekonomi';
    case 'Administrasi Publik':
    case 'Administrasi Bisnis':
    case 'Hubungan Internasional':
      return 'Fakultas Ilmu Sosial dan Politik';

    case 'Teknik Sipil':
    case 'Arsitektur':
      return 'Fakultas Teknik';

    case 'Matematika':
    case 'Fisika':
    case 'Informatika':
      return 'Fakultas Teknologi Informasi dan Sains';

    default:
      return '';
  }
};
