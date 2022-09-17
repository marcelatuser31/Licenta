package Backend.Model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "comanda")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Person person;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Cake> cakes;
<<<<<<< HEAD
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Drink> drinks;
public Order(Person p, List<Cake> c){
    this.person=p;
    this.cakes=c;
}

=======
>>>>>>> 5f1a4839f23cd1c1de9cd87cc79e65b224249607

    public Order(Person p, List<Cake> c){
        this.person=p;
        this.cakes=c;
    }
}
