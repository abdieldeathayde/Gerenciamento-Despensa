package br.com.despensa.lote;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
public interface LoteRepository extends JpaRepository<LoteProduto, Long> {
  List<LoteProduto> findByProdutoIdOrderByDataValidadeAsc(Long produtoId);
  List<LoteProduto> findByDataValidadeLessThanEqualOrderByDataValidadeAsc(LocalDate data);
}
