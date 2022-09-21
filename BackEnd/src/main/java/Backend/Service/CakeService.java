package Backend.Service;

import Backend.Model.Cake;
import Backend.Model.Ingredient;
import Backend.Utils.CakeType;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.util.List;

@Component
public interface CakeService {
    Cake readById(Long id);

    List<Ingredient> getIngredientsByCakeId(Long id);

    List<Cake> getAll();

    Float getTotalPrice(List<Long> cakeIds);

    Cake update(Cake cake);

    List<Cake> readByType(CakeType type);
    List<Cake> getExpiredCakes();

}
