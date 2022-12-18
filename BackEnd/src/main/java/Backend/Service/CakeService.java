package Backend.Service;

import Backend.Model.Cake;
import Backend.Model.Ingredient;
import Backend.Utils.CakeType;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Component
public interface CakeService {
    Cake getById(UUID id);
    List<Ingredient> getIngredientsByCakeId(UUID id);
    List<Cake> getAll();
    Float getTotalPrice(List<UUID> cakeIds);
    void update(Cake cake);
    List<Cake> getByType(CakeType type);
    List<Cake> getExpiredCakes();
    void deleteCake(UUID id);
    List<String> getCakeTypes();
    Cake addCakeImage(UUID id, MultipartFile image);
    Cake addCake(Cake cake);
}
