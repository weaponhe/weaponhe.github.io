---
layout: post
title: Rotate Array
category: OJ
tags: Array 
---
##问题描述
Rotate an array of n elements to the right by k steps.
For example, with n = 7 and k = 3, the array `[1,2,3,4,5,6,7]` is rotated to `[5,6,7,1,2,3,4]`.  
**Note:**    
Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.

##解决方案
这个问题的解法有很多。比如：把数组当成一个环形数组，将每个元素向前移动k次。在此介绍一种比较有意思的解法，首先将整个数组反转，然后将前k个元素反转，最后将剩下的元素反转。

##代码
```c++
class Solution {
public:
	void rotate(vector<int>& nums, int k) {
		k = k%nums.size();
		reverse(nums.begin(), nums.end());
		reverse(nums.begin(), nums.begin() + k);
		reverse(nums.begin() + k, nums.end());
	}
};
```
