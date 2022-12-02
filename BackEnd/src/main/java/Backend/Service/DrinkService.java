package Backend.Service;

import Backend.Model.Cake;
import Backend.Model.Drink;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
public interface DrinkService {
    Drink getById(Long id);
    List<Drink> getAll();
    Drink addDrink(Drink drink);
    Drink addDrinkImage(Long id, MultipartFile image);
}
