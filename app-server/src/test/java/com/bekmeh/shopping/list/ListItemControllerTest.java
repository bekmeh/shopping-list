package com.bekmeh.shopping.list;

import com.bekmeh.shopping.ShoppingApplication;
import com.google.gson.Gson;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ShoppingApplication.class)
@AutoConfigureMockMvc
class ListItemControllerTest {

    @InjectMocks
    private ListItemController listItemController;

    @MockBean
    private ListItemRepository listItemRepository;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void contextLoads() {
        Assert.assertNotNull(listItemController);
    }

    @Test
    void getAllItems() throws Exception {
        ListItem testItem = new ListItem();
        testItem.setName("Test name");
        testItem.setPrice(3.44);
        testItem.setId(12345);

        List<ListItem> testItemList = Arrays.asList(testItem);

        Mockito.when(listItemRepository.findAll(Sort.by("orderIndex"))).thenReturn(testItemList);

        Gson gson = new Gson();
        String json = gson.toJson(testItemList);
        mockMvc.perform(get("/items")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(json))
                .andExpect(status().isOk());
    }

    @Test
    void updateAll() throws Exception {
        ListItem testItem1 = new ListItem();
        testItem1.setName("Test name");
        testItem1.setPrice(3.44);
        testItem1.setId(12345);

        ListItem testItem = new ListItem();
        testItem.setName("Test name 2");
        testItem.setPrice(8.77);
        testItem.setId(12345);

        List<ListItem> testItemList = new ArrayList<>();
        testItemList.add(testItem);

        Mockito.when(listItemRepository.saveAll(Mockito.any(List.class))).thenReturn(testItemList);

        Gson gson = new Gson();
        String json1 = gson.toJson(new ArrayList<>());
        String json2 = gson.toJson(testItemList);
        mockMvc.perform(put("/items")
                .contentType(MediaType.APPLICATION_JSON).content(json1))
                .andExpect(content().json(json2))
                .andExpect(status().isOk());
    }
}