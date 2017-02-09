#!/usr/bin/python
# -*- coding: utf-8 -*- 

import tensorflow as tf
import numpy as np

# 使用numpy生成一个假数据

x_data = np.float32(np.random.rand(2,100))
y_data = np.dot([0.100,0.200],x_data) + 0.300

# 构造一个线性模型

b = tf.Variable(tf.zeros([1]))
W = tf.Variable(tf.random_uniform([1,2],-1.0,1.0))
y= tf.matmul(W,x_data) + b

# 最小化方差

loss = tf.reduce_mean(tf.square(y - y_data))
optimizer = tf.train.GradientDescentOptimizer(0.5)
train =optimizer.minimize(loss)

# 初始化变量
init =tf.initialize_all_variables()

# 启动图

sess = tf.Session()
sess.run(init)

# 拟合平面
#	if step % 20 == 0:
for step in xrange(0,201):
	sess.run(train)
	print step,sess.run(W),sess.run(b)
