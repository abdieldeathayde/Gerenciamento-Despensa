package br.com.despensa.compra;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/lista-compras")
public class ListaCompraController {
  private final ListaCompraRepository repository;
  public ListaCompraController(ListaCompraRepository repository) { this.repository=repository; }

  @GetMapping
  public List<ItemListaCompra> listar(@RequestParam Long despensaId) {
    return repository.findByDespensaIdOrderByCompradoAscCriadoEmDesc(despensaId);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ItemListaCompra criar(@Valid @RequestBody CriarItemRequest request) {
    return repository.save(new ItemListaCompra(request.despensaId(), request.nome().trim(),
      request.quantidade(), request.criadoPor()));
  }

  @PatchMapping("/{id}/comprado")
  public ItemListaCompra marcar(@PathVariable Long id, @RequestBody MarcarRequest request) {
    ItemListaCompra item = repository.findById(id).orElseThrow(
      () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item não encontrado"));
    item.marcarComprado(request.comprado());
    return repository.save(item);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void excluir(@PathVariable Long id) {
    if (!repository.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item não encontrado");
    repository.deleteById(id);
  }

  public record CriarItemRequest(@NotNull @Positive Long despensaId,
    @NotBlank @Size(max=140) String nome, @Size(max=30) String quantidade, @Positive Long criadoPor) {}
  public record MarcarRequest(boolean comprado) {}
}
