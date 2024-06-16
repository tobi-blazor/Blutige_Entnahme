package de.fhdortmund.blutentnahmebackend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    @GetMapping("/test")
    public Mitarbeiter test() {
        Mitarbeiter mitarbeiter = new Mitarbeiter();
        mitarbeiter.setName("Richard");
        mitarbeiter.setAlter(20);
        return mitarbeiter;
    }
}
