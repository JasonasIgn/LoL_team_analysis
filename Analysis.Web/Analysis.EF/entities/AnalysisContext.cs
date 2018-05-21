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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=LOL;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}
