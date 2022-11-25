package Backend.Service;

import Backend.Model.Drink;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface DrinkService {
    Drink readById(Long id);
    List<Drink> getAll();

}
