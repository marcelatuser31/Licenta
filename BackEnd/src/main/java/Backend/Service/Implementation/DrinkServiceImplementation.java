package Backend.Service.Implementation;

import Backend.Model.Drink;
import Backend.Repository.DrinkRepository;
import Backend.Service.DrinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DrinkServiceImplementation implements DrinkService {
    private final DrinkRepository drinkRepository;

    @Override
    public Drink getById(UUID id) {
        return drinkRepository.findFirstById(id);
    }

    @Override
    public List<Drink> getAll() {
        return (List<Drink>) drinkRepository.findAll();
    }

    @Override
    public Drink addDrink(Drink drink) {
        Drink newDrink = new Drink(UUID.randomUUID(), drink.getName(), drink.getWeight(), drink.getPrice(), drink.getAmount(), null);
        drinkRepository.save(newDrink);
        return newDrink;
    }

    @Override
    public Drink addDrinkImage(UUID id, MultipartFile image) {
        byte[] imageDrink = null;
        try {
            imageDrink = image.getBytes();
            System.out.println(imageDrink.length);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
        Drink drink = drinkRepository.findFirstById(id);
        if (drink == null) {
            return null;
        }
        drink.setImage(imageDrink);
        drinkRepository.save(drink);
        return drink;
    }

    @Override
    public void update(Drink drink) {
        Drink dbDrink = drinkRepository.findFirstById(drink.getId());

        if (dbDrink != null) {
            dbDrink.setAmount(drink.getAmount());
            dbDrink.setName(drink.getName());
            dbDrink.setPrice(drink.getPrice());
            dbDrink.setWeight(drink.getWeight());
            drinkRepository.save(dbDrink);
        }
    }

    @Override
    public void deleteDrink(UUID id) {
        Drink drink=drinkRepository.findFirstById(id);
        if(drink!=null)
            drinkRepository.delete(drink);
    }
}