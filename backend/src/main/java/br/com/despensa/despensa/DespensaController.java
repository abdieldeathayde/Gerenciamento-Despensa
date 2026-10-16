package br.com.despensa.despensa;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/despensas")
public class DespensaController {
  private final DespensaRepository repository;
  public DespensaController(DespensaRepository repository){this.repository=repository;}
  @GetMapping public List<Despensa> listar(){return repository.findAll();}
  @PostMapping @ResponseStatus(HttpStatus.CREATED)
  public Despensa criar(@Valid @RequestBody CriarDespensaRequest request){
    return repository.save(new Despensa(request.nome(),request.descricao(),request.proprietarioId()));
  }
  public record CriarDespensaRequest(@NotBlank @Size(max=100) String nome,@Size(max=500) String descricao,@NotNull @Positive Long proprietarioId){}
}
