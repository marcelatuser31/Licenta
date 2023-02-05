package Backend.Service;

import Backend.Model.Cake;
import Backend.Model.Drink;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Component
public interface DrinkService {
    Drink getById(UUID id);
    List<Drink> getAll();
    Drink addDrink(Drink drink);
    Drink addDrinkImage(UUID id, MultipartFile image);
    void update(Drink drink);
    void deleteDrink(UUID id);
}
