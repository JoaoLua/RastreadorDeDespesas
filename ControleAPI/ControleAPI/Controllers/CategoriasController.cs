using ControleAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ControleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        private readonly ICategoriasRepository _categoriasRepository;
        public CategoriasController(ICategoriasRepository categoriasRepository)
        {
            _categoriasRepository = categoriasRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategorias()
        {
            var categorias = await _categoriasRepository.GetAllCategoriasAsync();
            return Ok(categorias);
        }
        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetCategoriaById(int id)
        {
            var categoria = await _categoriasRepository.GetCategoriaByIdAsync(id);
            if (categoria == null)
                return NotFound(new { Message = "Categoria não encontrada." });
            return Ok(categoria);
        }
    }
}
