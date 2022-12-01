package Backend.Service;

import Backend.Model.Cake;
import Backend.Model.Ingredient;
import Backend.Utils.CakeType;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.util.List;

@Component
public interface CakeService {
    Cake getById(Long id);
    List<Ingredient> getIngredientsByCakeId(Long id);
    List<Cake> getAll();
    Float getTotalPrice(List<Long> cakeIds);
    void update(Cake cake);
    List<Cake> getByType(CakeType type);
    List<Cake> getExpiredCakes();
    void deleteCake(Long id);
    List<String> getCakeTypes();
    Cake addCakeImage(Long cakeId, MultipartFile image);
    Cake addCake(Cake cake);
}
