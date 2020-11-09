package com.supermarket.common.vo;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SupermarketResult {

    // 定义jackson对象
    private static final ObjectMapper MAPPER = new ObjectMapper();
    //查询数据总数量
    private Integer total;
    //分页查询的list结果
    private List<?> rows;

    public SupermarketResult() {
    }

    public SupermarketResult(Integer total, List<?> rows) {
        this.total = total;
        this.rows = rows;
    }

    public SupermarketResult(Long total, List<?> rows) {
        this.total = total.intValue();
        this.rows = rows;
    }

    /**
     * Object是集合转化
     *
     * @param jsonData json数据
     * @param clazz    集合中的类型
     * @return
     */
    public static SupermarketResult formatToList(String jsonData, Class<?> clazz) {
        try {
            JsonNode jsonNode = MAPPER.readTree(jsonData);
            JsonNode data = jsonNode.get("rows");
            List<?> list = null;
            if (data.isArray() && data.size() > 0) {
                list = MAPPER.readValue(data.traverse(),
                        MAPPER.getTypeFactory().constructCollectionType(List.class, clazz));
            }
            return new SupermarketResult(jsonNode.get("total").intValue(), list);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
