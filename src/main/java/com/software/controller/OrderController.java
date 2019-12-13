package com.software.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.software.trans.ReceiveOrder;
import com.software.trans.SendOrder;

@RestController
@RequestMapping("/order")
public class OrderController {
	@RequestMapping("/query")
	public List<SendOrder> queryOrder(@RequestBody ReceiveOrder param)
	{
		
		
		List<SendOrder> result = null;
		return result;//返回查找结果
	}
	
	@RequestMapping("/insert")
	public String insertOrder(@RequestBody List<ReceiveOrder> param){
		String result = null;
		return result;//返回成功/失败信息
	}
	
	@RequestMapping("/update")
	public String updateOrder(@RequestBody ReceiveOrder param){
		String result = null;
		return result;//返回成功/失败信息
	}
	
	@RequestMapping("/delete")
	public String deleteOrder(@RequestBody Map<String, String> param){
		String result = null;
		return result;//返回成功/失败信息
	}
	
	@RequestMapping("/check")
	public String checkOrder(@RequestBody Map<String, String> param){
		String result = null;
		return result;//返回成功/失败信息
	}
	
	@RequestMapping("/pay")
	public String payOrder(@RequestBody Map<String, String> param)
	{
		String result = null;
		return result;//返回成功/失败信息
	}
	
	@RequestMapping("/return")
	public String returnOrder(@RequestBody Map<String, String> param){
		String result = null;
		return result;//返回成功/失败信息
	}
}