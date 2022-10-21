package Backend;

import Backend.Model.*;
import Backend.Repository.*;
import Backend.Utils.CakeType;
import Backend.Utils.RoleType;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@Validated
public class MainClass extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(MainClass.class, args);
    }

    @Bean
    CommandLineRunner init(CakeRepository cakeRepository, IngredientRepository ingredientRepository, OrderRepository orderRepository, PersonRepository personRepository, RoleRepository roleRepository, DrinkRepository drinkRepository) {
        return args -> {
//
            Ingredient i = new Ingredient(1L, "ciocolata");
            Ingredient i1 = new Ingredient(2L, "vanilie");
            Ingredient i2 = new Ingredient(3L, "zahar");
            Ingredient i3 = new Ingredient(4L, "frisca");
            Ingredient i4 = new Ingredient(5L, "oua");
            Ingredient i5 = new Ingredient(6L, "lapte");
            Ingredient i6 = new Ingredient(7L, "caramel");

            ingredientRepository.save(i);
            ingredientRepository.save(i1);
            ingredientRepository.save(i2);
            ingredientRepository.save(i3);
            ingredientRepository.save(i4);
            ingredientRepository.save(i5);
            ingredientRepository.save(i6);
//
            List<Ingredient> ingredientList1 = new ArrayList<>();
            List<Ingredient> ingredientList2 = new ArrayList<>();
            List<Ingredient> ingredientList3 = new ArrayList<>();
            List<Ingredient> ingredientList4 = new ArrayList<>();
            List<Ingredient> ingredientList5 = new ArrayList<>();

            ingredientList1.add(i);
            ingredientList1.add(i1);
            ingredientList2.add(i2);
            ingredientList3.add(i3);
            ingredientList3.add(i4);
            ingredientList4.add(i5);
            ingredientList5.add(i6);
//
            Cake cake1 = new Cake(1L, "Ciocolata", 80F, 1200F, 5, ingredientList1, CakeType.Car, LocalDateTime.of(2022,8,25, 20, 25,6),null);
            Cake cake2 = new Cake(2L, "Vanilie", 90F, 1100F, 5, ingredientList2, CakeType.Kids, LocalDateTime.of(2022,12,26,21,25,3),null);
            Cake cake3 = new Cake(3L, "Frisca", 100F, 1150F, 4, ingredientList3, CakeType.BabyShower, LocalDateTime.of(2022,11,20,15,30,6),null);
            Cake cake4 = new Cake(4L, "Croissant", 5F, 200F, 6, ingredientList4, CakeType.Party,LocalDateTime.of(2022,10,10,5,31,5),null);
            Cake cake5 = new Cake(5l, "Snickers", 100F, 1400F, 7, ingredientList5, CakeType.Heart, LocalDateTime.of(2022,11,14,14,23,2),null);
//
            cakeRepository.save(cake1);
            cakeRepository.save(cake2);
            cakeRepository.save(cake3);
            cakeRepository.save(cake4);
            cakeRepository.save(cake5);
//
            Role role1 = new Role(1L, "Marce", "1234", RoleType.Admin, "tusermarcela@yahoo.com");
            Role role2 = new Role(2L, "Ale", "1234", RoleType.Client,"tuseralexia@yahoo.com");

            roleRepository.save(role1);
            roleRepository.save(role2);

          Person person1 = new Person(1L, "Marce", "Zalau", "0757492753", role1, false);
          Person person2 = new Person(2L, "Ale", "Chiesd", "0749473472", role2, false);

            personRepository.save(person1);
            personRepository.save(person2);

            Drink drink1 = new Drink(1L, "Cola", 330F, 5F, 20);
            Drink drink2 = new Drink(2L, "Sprite", 330F, 5F, 25);

            drinkRepository.save(drink1);
            drinkRepository.save(drink2);


        };
    }
}
