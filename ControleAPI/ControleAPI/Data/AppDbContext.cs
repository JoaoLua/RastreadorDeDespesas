using ControleAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Categorias> Categorias { get; set; }
        public DbSet<Despesas> Despesas { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Despesas>()
                            .HasOne(d => d.Categoria)           
                            .WithMany(c => c.Despesas)        
                            .HasForeignKey(d => d.CategoriaId)
                            .IsRequired();

            builder.Entity<Categorias>().HasData(
                new Categorias { Id = 1, Categoria = "Alimentação" },
                new Categorias { Id = 2, Categoria = "Transporte" },
                new Categorias { Id = 3, Categoria = "Compras" },
                new Categorias { Id = 4, Categoria = "Lazer" },
                new Categorias { Id = 5, Categoria = "Moradia" },
                new Categorias { Id = 6, Categoria = "Saúde" },
                new Categorias { Id = 7, Categoria = "Outros" }
            );
        }
    }
}
