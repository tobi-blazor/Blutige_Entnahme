﻿// <auto-generated />
using System;
using BlutentnahmeAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BlutentnahmeAPI.Migrations
{
    [DbContext(typeof(BlutentnahmeDBContext))]
    [Migration("20240702142254_initial")]
    partial class initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("BlutentnahmeAPI.Models.Auftrag", b =>
                {
                    b.Property<string>("AuftragsID")
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime>("GeplanterZeitpunkt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("PatientPersonID")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("AuftragsID");

                    b.HasIndex("PatientPersonID");

                    b.ToTable("Aufträge");
                });

            modelBuilder.Entity("BlutentnahmeAPI.Models.Blutprobe", b =>
                {
                    b.Property<string>("ProbeID")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("AuftragsID")
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime>("EntnahmeZeitpunkt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Grund")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Hinweise")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<TimeSpan>("MaximaleVerweildauer")
                        .HasColumnType("time(6)");

                    b.Property<string>("PersonalPersonID")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("ProbeID");

                    b.HasIndex("AuftragsID");

                    b.HasIndex("PersonalPersonID");

                    b.ToTable("Blutproben");
                });

            modelBuilder.Entity("BlutentnahmeAPI.Models.Labor", b =>
                {
                    b.Property<string>("LaborID")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("LaborID");

                    b.ToTable("Labore");
                });

            modelBuilder.Entity("BlutentnahmeAPI.Models.Patient", b =>
                {
                    b.Property<string>("PersonID")
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime>("Geburtsdatum")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Hinweise")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Nachname")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Vorname")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("PersonID");

                    b.ToTable("Patienten");
                });

            modelBuilder.Entity("BlutentnahmeAPI.Models.Personal", b =>
                {
                    b.Property<string>("PersonID")
                        .HasColumnType("varchar(255)");

                    b.Property<DateTime>("Geburtsdatum")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Nachname")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Vorname")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("PersonID");

                    b.ToTable("Personal");
                });

            modelBuilder.Entity("BlutentnahmeAPI.Models.Auftrag", b =>
                {
                    b.HasOne("BlutentnahmeAPI.Models.Patient", "Patient")
                        .WithMany()
                        .HasForeignKey("PatientPersonID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("BlutentnahmeAPI.Models.Blutprobe", b =>
                {
                    b.HasOne("BlutentnahmeAPI.Models.Auftrag", "Auftrag")
                        .WithMany()
                        .HasForeignKey("AuftragsID");

                    b.HasOne("BlutentnahmeAPI.Models.Personal", "Personal")
                        .WithMany()
                        .HasForeignKey("PersonalPersonID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Auftrag");

                    b.Navigation("Personal");
                });
#pragma warning restore 612, 618
        }
    }
}
