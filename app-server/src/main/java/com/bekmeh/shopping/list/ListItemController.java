package com.bekmeh.shopping.list;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("items")
public class ListItemController {

    // Access the bean auto-generated using the ListItemRepository interface
    @Autowired
    private ListItemRepository listItemRepository;


    @GetMapping
    public Iterable<ListItem> getAllItems() {
        return listItemRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getItem(@RequestParam final Long id) {
        Optional<ListItem> item = listItemRepository.findById(id.intValue());

        return item.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/{id}")
    public ResponseEntity<ListItem> addItem(@Valid @RequestBody ListItem item) {
        ListItem newItem = listItemRepository.save(item);
        return ResponseEntity.ok().body(newItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        listItemRepository.deleteById(id.intValue());
        return ResponseEntity.ok().build();
    }
}
