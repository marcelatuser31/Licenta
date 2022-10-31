package Backend.Service.Implementation;

import Backend.DTO.OrderDTO;
import Backend.DTO.OrderResponseDTO;
import Backend.Model.Cake;
import Backend.Model.Drink;
import Backend.Model.Order;
import Backend.Model.Person;
import Backend.Repository.CakeRepository;
import Backend.Repository.DrinkRepository;
import Backend.Repository.OrderRepository;
import Backend.Repository.PersonRepository;
import Backend.Service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImplementation implements OrderService {
    private final OrderRepository orderRepository;
    private final CakeRepository cakeRepository;
    private final PersonRepository personRepository;
    private final DrinkRepository drinkRepository;

    @Override
    public Order readById(Long id) {
        return orderRepository.findFirstById(id);
    }

    public OrderResponseDTO addOrder(OrderDTO orderDTO) {
        List<Cake> cakeList = new ArrayList<>();
        List<Drink> drinkList = new ArrayList<>();
        List<String> errorMessages = new ArrayList<>();

        for (int i = 0; i < orderDTO.getCakes().size(); i++) {
            Long id = orderDTO.getCakes().get(i).getId();
            Cake currentCake = cakeRepository.findFirstById(id);
            if (currentCake != null) {

                Integer dbAmountCake = currentCake.getAmount();
                Integer amountCake = orderDTO.getCakes().get(i).getAmount();

                if (amountCake < dbAmountCake) {
                    Cake cake = cakeRepository.findFirstById(id);
                    cakeList.add(cake);
                    Integer newAmountCake = dbAmountCake - amountCake;
                    cake.setAmount(newAmountCake);
                    cakeRepository.save(cake);
                } else {
                    String message = "Tortul " + currentCake.getName() + " nu este disponibil ";
                    errorMessages.add(message);
                }
            }
        }

        for (int i = 0; i < orderDTO.getDrinks().size(); i++) {
            Long id = orderDTO.getDrinks().get(i).getId();
            Drink currentDrink = drinkRepository.findFirstById(id);
            if (currentDrink != null) {

                Integer dbAmountDrink = currentDrink.getAmount();
                Integer amountDrink = orderDTO.getDrinks().get(i).getAmount();

                if (amountDrink < dbAmountDrink) {
                    Drink drink = drinkRepository.findFirstById(id);
                    drinkList.add(drink);
                    Integer newAmountDrink = dbAmountDrink - amountDrink;
                    drink.setAmount(newAmountDrink);
                    drinkRepository.save(drink);
                } else {
                    String message = "Bautura " + currentDrink.getName() + " nu este disponibila";
                    errorMessages.add(message);
                }
            }
        }

        Person person = personRepository.findFirstById(orderDTO.getId());
        Order order = new Order(100L, person, cakeList, drinkList, LocalDateTime.now());
        orderRepository.save(order);

        Float suma;
        Float sumaCake;
        Float sumaDrink;
        sumaCake = 0F;
        sumaDrink = 0F;

        for (int i = 0; i < cakeList.size(); i++) {
            Float CakePrice = cakeList.get(i).getPrice();
            sumaCake = sumaCake + CakePrice;
        }
        for (int i = 0; i < drinkList.size(); i++) {
            Float DrinkPrice = drinkList.get(i).getPrice();
            sumaDrink = sumaDrink + DrinkPrice;
        }
        suma = sumaCake + sumaDrink;
        return new OrderResponseDTO(suma, errorMessages);
    }

    @Override
    public Order update(Order order) {
        Order dbOrder = orderRepository.findFirstById(order.getId());

        dbOrder.setPerson(order.getPerson());
        dbOrder.setCakes(order.getCakes());
        orderRepository.save(dbOrder);

        return dbOrder;
    }

    @Override
    public void cancelOrder(Long id) {
        Order order = orderRepository.findFirstById(id);
        LocalDateTime currentDate = LocalDateTime.now();
        if (order.getDate().getYear() == currentDate.getYear() && order.getDate().getMonth() == currentDate.getMonth() && order.getDate().getDayOfMonth() == currentDate.getDayOfMonth()) {
            orderRepository.delete(order);
        }
    }
}
