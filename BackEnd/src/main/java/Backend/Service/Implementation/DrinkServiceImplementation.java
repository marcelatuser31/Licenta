package Backend.Service.Implementation;

import Backend.Model.Drink;
import Backend.Repository.DrinkRepository;
import Backend.Service.DrinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DrinkServiceImplementation implements DrinkService {
    private final DrinkRepository drinkRepository;

    @Override
    public Drink readById(Long id) {
        return drinkRepository.findFirstById(id);
    }
}
