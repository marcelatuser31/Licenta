package Backend.Service;

import Backend.Model.Drink;
import org.springframework.stereotype.Component;

@Component
public interface DrinkService {
    Drink readById(Long id);

}
