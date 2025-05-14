IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'BeatBlock')
BEGIN
  CREATE DATABASE BeatBlock
END
GO