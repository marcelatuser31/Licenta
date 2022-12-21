package Backend.Model;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "comanda")
@Data
public class Order implements Serializable {
    @Id
    @GenericGenerator(name="UUID", strategy = "uuid2")
    @GeneratedValue(generator = "UUID")
    private UUID id;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    private Person person;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.DETACH)
    private List<Cake> cakes;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    private List<Drink> drinks;

    private LocalDateTime date;

    private String address;

    public Order(Person p, List<Cake> c){
        this.person=p;
        this.cakes=c;
    }
}
