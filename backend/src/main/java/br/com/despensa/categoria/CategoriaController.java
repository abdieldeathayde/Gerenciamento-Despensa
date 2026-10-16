package br.com.despensa.categoria;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {
  private final CategoriaRepository repository;
  public CategoriaController(CategoriaRepository repository) { this.repository = repository; }

  @GetMapping
  public List<Categoria> listar(@RequestParam Long despensaId) {
    return repository.findByDespensaIdOrderByNomeAsc(despensaId);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Categoria criar(@Valid @RequestBody CategoriaRequest request) {
    return repository.save(new Categoria(request.nome().trim(), request.despensaId()));
  }

  public record CategoriaRequest(@NotBlank @Size(max=80) String nome,
                                 @NotNull @Positive Long despensaId) {}
}
