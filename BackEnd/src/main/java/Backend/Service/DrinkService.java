package Backend.Service;

import Backend.Model.Drink;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface DrinkService {
    Drink getById(Long id);
    List<Drink> getAll();

}
