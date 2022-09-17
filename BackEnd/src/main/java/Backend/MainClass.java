package Backend;

import Backend.Repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.validation.annotation.Validated;

@SpringBootApplication
@Validated
public class MainClass extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(MainClass.class, args);
    }

    @Bean
    CommandLineRunner init (CakeRepository cakeRepository, IngredientRepository ingredientRepository, OrderRepository orderRepository, PersonRepository personRepository, RoleRepository roleRepository){
        return  args ->{
//          Cake cake = new Cake();
//           Ingredient ingredient = Ingredient.builder().id(1L).name("zahar").build();
//            ingredientRepository.save(ingredient);

//    Ingredient ingredient1= Ingredient.builder().id(5L).name("faina").build();
//           ingredientRepository.save(ingredient1);
//            System.out.println(ingredient1);
//            System.out.println(ingredientRepository.findFirstById(1L));
//            System.out.println(ingredientRepository.findAllByIdIsLessThan(5L));

//      Cake cake1 = Cake.builder().name("Prajitura").id(124L).weight(12F).amount(54).build();
//      cakeRepository.save(cake1);
//      System.out.println(cake1);
//            System.out.println(cake);

//        Order order= Order.builder().id(4L).build();
//        orderRepository.save(order);

            //Person person = Person.builder().id(10L).phone("0757492753").name("ana").build();
            //personRepository.save(person);

           // Role role = Role.builder().username("ana").id(6L).password("1234").build();
            //roleRepository.save(role);

//            System.out.println(cakeRepository.findAllById(3L));
//            System.out.println(ingredientRepository.findAllById(8L));
//            //System.out.println(orderRepository.findFirstById(9L));
//            System.out.println(personRepository.findAllById(11L));
//            //System.out.println(roleRepository.findAllById(14L));

//            Role roles= roleRepository.findFirstByUsername("ana");
//            System.out.println(roles);
//
//
//            Role role1=new Role(2L,"ghfdhgfhj","hgdhgfhg", Type.Admin);
//            System.out.println(role1);
//
//            roleRepository.save(role1);




//            Ingredient i= new Ingredient(20L, "ciocolata");
//            Ingredient i1=new Ingredient(10L, "vanilie");
//
//            List<Ingredient> ingredientList=new ArrayList<>();
//            ingredientList.add(i);
//            ingredientList.add(i1);
//
//            Cake cake= new Cake(662L,"ciocolata",100F,1200F,5,ingredientList);
//            cakeRepository.save(cake);
        };

    }
}
