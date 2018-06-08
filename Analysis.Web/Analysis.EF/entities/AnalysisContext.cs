using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Analysis.EF.entities
{
    public partial class AnalysisContext : DbContext
    {
        //konstruktorius
        public AnalysisContext(DbContextOptions<AnalysisContext> options)
        : base(options)
        { }

        public virtual DbSet<Match> Match { get; set; }
        public virtual DbSet<GeneralData> GeneralData { get; set; }

        public virtual DbSet<Champion> Champion { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=LOL;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Match>(entity =>
            {
                entity.ToTable("matches");

                entity.Property(e => e.Id).HasColumnName("Id");

                entity.Property(e => e.Suggestion0)
                .HasColumnName("Suggestion0");

                entity.Property(e => e.Suggestion1)
                .HasColumnName("Suggestion1");

                entity.Property(e => e.Suggestion2)
                .HasColumnName("Suggestion2");

                entity.Property(e => e.Suggestion3)
                .HasColumnName("Suggestion3");

                entity.Property(e => e.Suggestion4)
                .HasColumnName("Suggestion4");

                entity.Property(e => e.Suggestion5)
                .HasColumnName("Suggestion5");

                entity.Property(e => e.Suggestion6)
                .HasColumnName("Suggestion6");

                entity.Property(e => e.Suggestion7)
                .HasColumnName("Suggestion7");

                entity.Property(e => e.Suggestion8)
                .HasColumnName("Suggestion8");

                entity.Property(e => e.Suggestion9)
                .HasColumnName("Suggestion9");

                

                entity.Property(e => e.Team1Wins)
                    .HasColumnName("Team1Wins")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Team2Wins)
                    .HasColumnName("Team2Wins")
                    .HasDefaultValueSql("((0))");
            });

            modelBuilder.Entity<GeneralData>(entity =>
            {
                entity.ToTable("general");

                entity.Property(e => e.Id).HasColumnName("Id");

                entity.Property(e => e.ApiKey).HasColumnName("ApiKey");

                entity.Property(e => e.CurrentMatchId)
                .HasColumnName("CurrentMatchId");

                entity.Property(e => e.TotalTeamCombinations)
                    .HasColumnName("TotalTeamCombinations")
                    .HasDefaultValueSql("((0))");
            });

            modelBuilder.Entity<Champion>(entity =>
            {
                entity.ToTable("champion");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Title)
                .HasColumnName("title");

                entity.Property(e => e.Name)
               .HasColumnName("name");

                entity.Property(e => e.Key)
                    .HasColumnName("keyy");
            });
        }
    }
}
