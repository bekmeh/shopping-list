package com.bekmeh.shopping.list;

import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("items")
public class ListItemController {

    private static final List<ListItem> DUMMY_LIST = Arrays.asList(new ListItem(1L, "item 1", 3.44));
    private static final ListItem DUMMY_ITEM = new ListItem(1L, "item 1", 3.44);

    @GetMapping
    public List<ListItem> getAllItems() {
        // TODO
        return DUMMY_LIST;
    }

    @GetMapping("/{id}")
    public ListItem listItem() {
        // TODO
        return DUMMY_ITEM;
    }

    @PostMapping("/{id}")
    public List<ListItem> addItem() {
        // TODO
        return DUMMY_LIST;
    }

    @DeleteMapping("/{id}")
    public ListItem deleteItem() {
        // TODO
        return DUMMY_ITEM;
    }
}
