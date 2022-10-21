package Backend.Model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "comanda")
@Data
public class Order implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Person person;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Cake> cakes;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Drink> drinks;

    private LocalDateTime date;

    public Order(Person p, List<Cake> c){
        this.person=p;
        this.cakes=c;
    }
}
