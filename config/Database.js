import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: 'layangdb.mysql.database.azure.com',
  user: 'layangadmin',
  password: '(.Root.)',
  database: 'tes_warga',
});

const createTable = async () => {
  let connection;

  try {
    connection = await db.getConnection();
    console.log("Connected to MySQL database");

    const createSuperAdminTable = `
    CREATE TABLE IF NOT EXISTS super_admin (
      superadmin_id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      username varchar(45) NOT NULL,
      super_admin_password varchar(20) NOT NULL,
      PRIMARY KEY (superadmin_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    await connection.query(createSuperAdminTable);
    console.log("super_admin table created (if not exists)");

    const createProvinsiTableQuery = `
    CREATE TABLE IF NOT EXISTS provinsi (
        id varchar(2) NOT NULL,
        name varchar(30) NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    await connection.query(createProvinsiTableQuery);
    console.log("Provinsi table created (if not exists)");

    const createKabupatenTableQuery = `
    CREATE TABLE IF NOT EXISTS kabupaten (
      id varchar(4) NOT NULL,
      province_id varchar(2) DEFAULT NULL,
      name varchar(255) DEFAULT NULL,
      PRIMARY KEY (id),
      KEY province_id (province_id),
      CONSTRAINT kabupaten_ibfk_1 FOREIGN KEY (province_id) REFERENCES provinsi (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    await connection.query(createKabupatenTableQuery);
    console.log("kabupaten table created (if not exists)");

    const createKecamatanTableQuery = `
        CREATE TABLE IF NOT EXISTS kecamatan (
        id varchar(10) NOT NULL,
        regency_id varchar(4) DEFAULT NULL,
        name varchar(255) DEFAULT NULL,
        PRIMARY KEY (id),
        CONSTRAINT kecamatan_ibfk_1 FOREIGN KEY (regency_id) REFERENCES kabupaten (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    await connection.query(createKecamatanTableQuery);
    console.log("kecamatan table created (if not exists)");

    const createKelurahanTableQuery = `
    CREATE TABLE IF NOT EXISTS kelurahan (
      id int(10) NOT NULL AUTO_INCREMENT,
      district_id varchar(7) NOT NULL,
      name varchar(255) DEFAULT NULL,
      PRIMARY KEY (id),
      KEY memiliki (district_id),
      CONSTRAINT memiliki FOREIGN KEY (district_id) REFERENCES kecamatan (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    await connection.query(createKelurahanTableQuery);
    console.log("kelurahan table created (if not exists)");

    const createAdminKelurahanTable = `
    CREATE TABLE IF NOT EXISTS admin_kelurahan (
      id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      kelurahan_id int(10) NOT NULL,
      nama varchar(255) NOT NULL,
      password varchar(255) NOT NULL,
      pangkat varchar(20) DEFAULT NULL,
      nomor varchar(15) DEFAULT NULL,
      email varchar(255) NOT NULL,
      alamat varchar(255) NOT NULL,
      imageURL varchar(255) NOT NULL,
      PRIMARY KEY (id),
      KEY kelurahan_id_index (kelurahan_id),
      CONSTRAINT kelurahan_id_index FOREIGN KEY (kelurahan_id) REFERENCES kelurahan (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    await connection.query(createAdminKelurahanTable);
    console.log("admin_kelurahan table created (if not exists)");

    const createAgendaTable = `
    CREATE TABLE IF NOT EXISTS agenda (
      agenda_id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      kelurahan_id int(10) NOT NULL,
      judul varchar(255) DEFAULT NULL,
      tanggal datetime DEFAULT NULL,
      imageURL varchar(255) NOT NULL,
      tempat varchar(20) NOT NULL,
      PRIMARY KEY (agenda_id),
      KEY kelurahan_id_indexx (kelurahan_id),
      CONSTRAINT kelurahan_id_indexx FOREIGN KEY (kelurahan_id) REFERENCES kelurahan (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    await connection.query(createAgendaTable);
    console.log("agenda table created (if not exists)");

    const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS user (
      user_id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      kelurahan_id int(10) NOT NULL,
      username varchar(40) DEFAULT NULL,
      password varchar(20) DEFAULT NULL,
      email varchar(45) DEFAULT NULL,
      nomor varchar(15) DEFAULT NULL,
      alamat text DEFAULT NULL,
      kota VARCHAR(100) DEFAULT NULL,
      imageURL varchar(255) DEFAULT NULL,
      PRIMARY KEY (user_id),
      KEY mempunyai (kelurahan_id),
      CONSTRAINT mempunyai FOREIGN KEY (kelurahan_id) REFERENCES kelurahan (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    await connection.query(createUserTableQuery);
    console.log("user table created (if not exists)");

    const createLaporanTableQuery = `
    CREATE TABLE IF NOT EXISTS laporan (
      laporan_ID int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      user_id int(10) UNSIGNED NOT NULL,
      bukti_laporan varchar(255) NOT NULL,
      lokasi_laporan text NOT NULL,
      jenis_laporan enum('Infrastruktur dan Lingkungan','Keamanan dan Ketertiban','Ekonomi','Kesehatan dan Layanan Kesehatan') NOT NULL,
      deskripsi text DEFAULT NULL,
      PRIMARY KEY (laporan_ID),
      KEY Laporan_FKIndex1 (user_id),
      CONSTRAINT Laporan_FKIndex1 FOREIGN KEY (user_id) REFERENCES user (user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;

    await connection.query(createLaporanTableQuery);
    console.log("laporan table created (if not exists)");

    const createPengajuanTableQuery = `
  CREATE TABLE IF NOT EXISTS pengajuan (
    pengajuan_id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id int(10) UNSIGNED NOT NULL,
    jenis_surat enum('Surat Pengantar','Keterangan Tidak Mampu','Pembuatan Keluarga') NOT NULL,
    tanggal_pengajuan datetime NOT NULL,
    proses enum('Terkirim','Diproses','Sudah Diproses','Selesai') NOT NULL,
    file_ktp varchar(255) NOT NULL,
    file_kk varchar(255) NOT NULL,
    nama_lengkap varchar(50) NOT NULL,
    no_nik varchar(16) NOT NULL,
    agama enum('Islam','Kristen','Khatolik','Hindu','Budha') NOT NULL,
    alamat varchar(255) NOT NULL,
    status varchar(50) NOT NULL,
    PRIMARY KEY (pengajuan_id),
    KEY pengajuan_FKIndex1 (user_id),
    CONSTRAINT pengajuan_FKIndex1 FOREIGN KEY (user_id) REFERENCES user (user_id)
  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`;

    await connection.query(createPengajuanTableQuery);
    console.log("pengajuan table created (if not exists)");

    const createArticleTableQuery = `
      CREATE TABLE IF NOT EXISTS article (
        article_id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        author varchar(40) DEFAULT NULL,
        date varchar(20) DEFAULT NULL,
        title varchar(225) DEFAULT NULL,
        content text DEFAULT NULL,
        image varchar(225) DEFAULT NULL,
        url VARCHAR(100) DEFAULT NULL,
        PRIMARY KEY (article_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `;
    await connection.query(createArticleTableQuery);
    console.log("article table created (if not exists)");
    console.log("All tables created (if not exists)");
  } catch (err) {
    console.error("Error during table creation:", err);
    throw err;
  } finally {
    if (connection) {
      connection.release();
      console.log("Connection released");
    }
  }
};

export { db, createTable };
