package de.fhdortmund.blutentnahmebackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonalController {

    private final PersonalRepository personalRepository;

    @Autowired
    public PersonalController(PersonalRepository personalRepository) {
        this.personalRepository = personalRepository;
    }

    @GetMapping("/get")
    public Personal get() {
        return personalRepository.getReferenceById(1L);
    }
}
