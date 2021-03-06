// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using webapibasica.Data;

#nullable disable

namespace webapibasica.Migrations
{
    [DbContext(typeof(BasicaContext))]
    partial class BasicaContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("webapibasica.Entities.Aluno", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DtInclusao")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("dt_inclusao");

                    b.Property<DateTime>("DtModificacao")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValue(new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc))
                        .HasColumnName("dt_alteracao");

                    b.Property<DateTime>("DtNascimento")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("dt_nascimento");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("nome");

                    b.HasKey("Id");

                    b.ToTable("aluno_tb", (string)null);
                });

            modelBuilder.Entity("webapibasica.Entities.AlunoNota", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AlunoId")
                        .HasColumnType("integer")
                        .HasColumnName("id_aluno");

                    b.Property<DateTime>("DtInclusao")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("dt_inclusao");

                    b.Property<DateTime>("DtModificacao")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValue(new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc))
                        .HasColumnName("dt_modificacao");

                    b.Property<int>("Nota")
                        .HasColumnType("integer")
                        .HasColumnName("nota");

                    b.HasKey("Id");

                    b.HasIndex("AlunoId");

                    b.ToTable("aluno_nota_tb", (string)null);
                });

            modelBuilder.Entity("webapibasica.Entities.AlunoNota", b =>
                {
                    b.HasOne("webapibasica.Entities.Aluno", "Aluno")
                        .WithMany("AlunoNotas")
                        .HasForeignKey("AlunoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Aluno");
                });

            modelBuilder.Entity("webapibasica.Entities.Aluno", b =>
                {
                    b.Navigation("AlunoNotas");
                });
#pragma warning restore 612, 618
        }
    }
}
