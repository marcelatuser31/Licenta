package Backend.Service;

import Backend.Model.Cake;
import Backend.Model.Ingredient;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface CakeService {
    Cake readById(Long id);
    List<Ingredient> getIngredientsByCakeId(Long id);
    List<Cake> getAll();
    Float getTotalPrice(List<Long> cakeIds);
    Cake update(Cake cake);
}
