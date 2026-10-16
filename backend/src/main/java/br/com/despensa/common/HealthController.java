package br.com.despensa.common;
import java.util.Map;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/health")
public class HealthController {
  @GetMapping public Map<String,String> health() {
    return Map.of("status","UP","application","gerenciamento-despensa");
  }
}
