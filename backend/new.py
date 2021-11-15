import io
import os
import cv2
import json
import zipfile
import pymysql
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from PIL import Image


db = pymysql.connect(host="127.0.0.1",
                     user="root",
                     password="root",
                     database="test")
cursor = db.cursor()

# 后端服务启动
app = Flask(__name__)
CORS(app, resources=r'/*')  # 解决跨域问题


@app.route('/login', methods=['POST', 'GET'])
def login_check():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        print("username:" + str(username))
        print("password:" + str(password))
        cursor.execute(
            "select id,username from userinfo where username = '%s' and password = '%s' "
            % (username, password))
        data = cursor.fetchone()
        if data is not None:
            print("login success")
            jsondata = {"id": str(data[0]), "username": str(data[1])}
            return jsonify(jsondata)
        else:
            print("login failed")
            jsondata = {}
            return jsonify(jsondata)
    elif request.method == "GET":
        print("get")
        jsondata = {}
        return jsonify(jsondata)
    else:
        print("error")
        jsondata = {}
        return jsonify(jsondata)


@app.route('/register', methods=['POST'])
def register_check():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        email = request.form.get("email")
        print("username:" + str(username))
        print("password:" + str(password))
        print("email:" + str(email))
        cursor.execute("select username from userinfo where username = '%s'" %
                       (username))
        data = cursor.fetchone()
        if data is not None:
            print("Duplicate user name exists")
            return "-1"
        cursor.execute("select email from userinfo where email = '%s'" %
                       (email))
        data = cursor.fetchone()
        if data is not None:
            print("Duplicate email exists")
            return "-1"
        cursor.execute
        try:
            cursor.execute(
                "insert into userinfo(username,password,email) values (\"" +
                str(username) + "\",\"" + str(password) + "\",\"" +
                str(email) + "\")")
            db.commit()  # 提交，使操作生效
            print("add a new user successfully!")
            return "1"
        except Exception as e:
            print("add a new user failed:", e)
            db.rollback()  # 发生错误就回滚
            return "-1"
    else:
        print("error")
        return "-1"


@app.route('/home/userinfo', methods=['POST'])
def user_info():
    if request.method == "POST":
        username = request.form.get("username")
        cursor.execute(
            "select taskname,statement,picturenum,publishtime from taskinfo as A, userinfo as B where A.publisherid = B.id and username = '%s'" % username)
        data = cursor.fetchall()
        temp = {}
        result = []
        if data is not None:
            for i in data:
                temp["name"] = i[0]
                temp["statement"] = i[1]
                temp["picturenum"] = i[2]
                temp["ctime"] = i[3]
                result.append(temp.copy())  # 特别注意要用copy，否则只是内存的引用
            print("result:", len(data))
            return jsonify(result)
        else:
            print("result: NULL")
            return jsonify([])


@app.route('/home/public', methods=['POST'])
def public_task():
    if request.method == "POST":
        cursor.execute(
            "select A.id,taskname,statement,username,picturenum,publishtime from taskinfo as A, userinfo as B where A.publisherid = B.id"
        )
        data = cursor.fetchall()
        temp = {}
        result = []
        if data is not None:
            for i in data:
                temp["taskid"] = i[0]
                temp["name"] = i[1]
                temp["statement"] = i[2]
                temp["publisher"] = i[3]
                temp["picturenum"] = i[4]
                temp["ctime"] = i[5]
                result.append(temp.copy())  # 特别注意要用copy，否则只是内存的引用
            print("result:", len(data))
            return jsonify(result)
        else:
            print("result: NULL")
            return jsonify([])


@app.route('/home/create_picture_task', methods=['POST'])
def create_picture_task():
    '''返回文件上传结果信息'''
    publisherid = request.form.get("publisherid"),
    picturenum = request.form.get("picturenum"),
    publishtime = request.form.get("publishtime"),

    print(publishtime)
    taskname = request.form.get("taskname"),
    statement = request.form.get("statement"),
    try:
        cursor.execute(
            "insert into taskinfo(picturenum,publisherid,publishtime,statement,taskname) values (%s, %s, %s, %s, %s)",
            (picturenum, publisherid, publishtime, statement, taskname))
        db.commit()  # 提交，使操作生效
        result = cursor.execute("select last_insert_id() from taskinfo")
        db.commit()  # 提交，使操作生效
        print("cteate successfully!")
        return str(result)
    except Exception as e:
        print("Create task failed:", e)
        db.rollback()  # 发生错误就回滚
        return "-1"


@app.route('/home/upload_picture', methods=['POST'])
def file_upload():
    '''返回文件上传结果信息'''
    file = request.files.get('files')
    userid = request.form.get('userid')
    taskid = request.form.get('taskid')
    print(request.files)
    print(file)
    file.filename = str(userid) + '_' + str(taskid) + '_' + file.filename
    file_path = './file/' + file.filename
    try:
        cursor.execute(
            "insert into taskcontent(taskid,url,recnum) values (%s, %s, %s)",
            (taskid, file_path, 0))
        db.commit()  # 提交，使操作生效
        print("cteate successfully!")
        if os.path.exists(file_path):
            return {'msg': '该文件已存在'}
        else:
            file.save(file_path)
            return {'msg': '保存文件成功'}
    except Exception as e:
        print("Create task failed:", e)
        db.rollback()  # 发生错误就回滚
        return "-1"


@app.route('/home/create_video_task', methods=['POST'])
def create_video_task():
    '''返回文件上传结果信息'''
    publisherid = request.form.get("publisherid"),
    timeinterval = request.form.get("timeinterval"),
    publishtime = request.form.get("publishtime"),
    file = request.files.get("files")
    taskname = request.form.get("taskname"),
    statement = request.form.get("statement"),
    try:
        cursor.execute(
            "insert into taskinfo(picturenum,publisherid,publishtime,statement,taskname) values (%s, %s, %s, %s, %s)",
            (0, publisherid, publishtime, statement, taskname))
        db.commit()  # 提交，使操作生效
        result = cursor.execute("select last_insert_id() from taskinfo")
        db.commit()  # 提交，使操作生效
        file.filename = 'video' + '_' + str(result) + '_' + file.filename
        file_path = './file/' + file.filename
        print(int(timeinterval[0]))
        if os.path.exists(file_path):
            return {'msg': '该文件已存在'}
        else:
            file.save(file_path)
            cap = cv2.VideoCapture(file_path)
            print(cap)
            # fps = cap.get(cv2.CAP_PROP_FPS)
            # fourcc = cv2.VideoWriter_fourcc(*'XVID')
            # size = (int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)),
            #         int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)))
            i = 0
            j = 0
            count = 0
            while (cap.isOpened()):
                i = i + 1
                ret, frame = cap.read()
                if i % int(timeinterval[0]) == 0:
                    j = j + 1
                    count = count + 1
                    if ret is True:
                        file_path2 = './file/' + str(j) + '_' + str(result) + '_' + '.jpg'
                        cv2.imwrite(file_path2, frame)
                        try:
                            cursor.execute(
                                "insert into taskcontent(taskid,url,recnum) values (%s, %s, %s)",
                                (result, file_path2, 0))
                            db.commit()  # 提交，使操作生效
                        except Exception as e:
                            print("Create task failed:", e)
                            db.rollback()  # 发生错误就回滚
                            return "-1"
                    else:
                        break
            cap.release()
            cv2.destroyAllWindows()
            os.remove(file_path)
            try:
                cursor.execute(
                    "update taskinfo set picturenum=%s where id=%s",
                    (count, result))
                db.commit()  # 提交，使操作生效
                result = cursor.execute(
                    "select last_insert_id() from taskinfo")
                db.commit()  # 提交，使操作生效
                print("cteate successfully!")
                return {'msg': '保存文件成功'}
            except Exception as e:
                print("Create task failed:", e)
                db.rollback()  # 发生错误就回滚
                return "-1"
    except Exception as e:
        print("Create task failed:", e)
        db.rollback()  # 发生错误就回滚
        return "-1"


@app.route('/home/get_picture_inf', methods=['POST'])
def get_picture_info():
    if request.method == "POST":
        taskid = request.form.get('taskid')
        cursor.execute(
            "select id,recnum from taskcontent where taskid=%s", (taskid)
        )
        data = cursor.fetchall()
        temp = {}
        result = []
        if data is not None:
            for i in data:
                temp["id"] = i[0]
                temp["recnum"] = i[1]
                result.append(temp.copy())  # 特别注意要用copy，否则只是内存的引用
            return jsonify(result)
        else:
            return jsonify([])


@app.route('/home/get_picture', methods=['GET', 'POST'])
def get_picture():
    id = request.form.get("pictureid")
    print(id)
    try:
        cursor.execute(
            "select url from taskcontent where id=%s", (id)
        )
        img_url = cursor.fetchone()
        with open(img_url[0], 'rb') as f:
            a = f.read()
        '''对读取的图片进行处理'''
        img_stream = io.BytesIO(a)
        img = Image.open(img_stream)

        imgByteArr = io.BytesIO()
        img.save(imgByteArr, format='PNG')
        imgByteArr = imgByteArr.getvalue()

        # result = []
        # result.append(temp.copy())
        return imgByteArr
    except Exception as e:
        print(e)
        return "-1"


# @app.route('/home/change_rec', methods=['GET', 'POST'])
# def change_rec():
#     id = request.form.get("pictureid")
#     recs = request.form.get("recs")
#     print(id)
#     print(recs[0])
#     try:
#         # cursor.execute(
#         #         "select w,h,x,y from recinfo where pictureid=%s", (id)
#         #     )
#         # data = cursor.fetchall()
#         # temp = {}
#         # result = []
#         # if data is not None:
#         #     for i in data:
#         #         temp["w"] = i[0]
#         #         temp["h"] = i[1]
#         #         temp["x"] = i[2]
#         #         temp["y"] = i[3]
#         #         result.append(temp.copy())  # 特别注意要用copy，否则只是内存的引用
#         # return jsonify(result)
#         return "1"
#     except Exception as e:
#         print(e)
#         return "-1"


@app.route('/home/get_rec', methods=['GET', 'POST'])
def get_rec():
    id = request.form.get("pictureid")
    try:
        cursor.execute(
            "select w,h,x,y from recinfo where pictureid=%s", (id)
        )
        data = cursor.fetchall()
        temp = {}
        result = []
        if data is not None:
            for i in data:
                temp["w"] = i[0]
                temp["h"] = i[1]
                temp["x"] = i[2]
                temp["y"] = i[3]
                result.append(temp.copy())  # 特别注意要用copy，否则只是内存的引用
        return jsonify(result)
    except Exception as e:
        print(e)
        return "-1"


@app.route('/home/delete_all_rec', methods=['GET', 'POST'])
def delete_all_rec():
    id = request.form.get("pictureid")
    try:
        cursor.execute(
            "delete from recinfo where pictureid='%s'" % (id)
        )
        db.commit()
        # temp = {}
        # result = []
        # if data is not None:
        #     for i in data:
        #         temp["w"] = i[0]
        #         temp["h"] = i[1]
        #         temp["x"] = i[2]
        #         temp["y"] = i[3]
        #         result.append(temp.copy())  # 特别注意要用copy，否则只是内存的引用
        # return jsonify(result)
        print("clean success!")
        return "1"
    except Exception as e:
        print(e)
        return "-1"


@app.route('/home/add_rec', methods=['GET', 'POST'])
def add_rec():
    id = request.form.get("pictureid")
    x = request.form.get("x")
    y = request.form.get("y")
    w = request.form.get("w")
    h = request.form.get("h")
    try:
        cursor.execute(
            "insert into recinfo (pictureid,w,h,x,y) values(%s,%s,%s,%s,%s)", (id, w, h, x, y)
        )
        db.commit()
        print("add success!")
        return "success!"
    except Exception as e:
        print(e)
        return "-1"


def zipDir(dirpath, outFullName, taskid):
    """
    压缩指定文件夹
    :param dirpath: 目标文件夹路径
    :param outFullName: 压缩文件保存路径+xxxx.zip
    :return: 无
    """
    zip = zipfile.ZipFile(outFullName, "w", zipfile.ZIP_DEFLATED)
    zip.write(dirpath)
    cursor.execute(
        "select url from taskcontent where taskid = '%s'" % (taskid))
    data = cursor.fetchall()
    for i in data:
        zip.write(i[0])
    zip.close


@app.route('/home/test_download', methods=['GET', 'POST'])
def test_download():
    taskid = request.form.get('taskid')
    info = {
        "year": 2021,  # 年份
        "version": "1.0",  # 版本
        "description": "",  # 数据集描述
        "contributor": "lty and hmq",  # 提供者
        "url": "http://course.zju.edu.cn/",  # 下载地址
        "date_created": "",  # 数据创建时间
    }
    cursor.execute(
        "select picturenum,statement from taskinfo where id='%s'" % (taskid))
    data = cursor.fetchone()
    info["description"] = data[1]

    image = []
    annotation = []
    temp = {}
    temp2 = {}
    cursor.execute(
        "select id,url from taskcontent where taskid = '%s'" % (taskid))
    data = cursor.fetchall()
    for i in data:
        temp["id"] = i[0]  # 图片的id
        temp["width"] = 800  # 宽
        temp["height"] = 600  # 高
        temp["file_name"] = i[1]  # 图片名
        temp["flickr_url"] = "what???"  # flickr网路地址
        temp["coco_url"] = "what???"  # 网路地址路径
        image.append(temp.copy())
        cursor.execute(
            "select x,y,w,h from recinfo where pictureid = '%s'" % (i[0]))
        data2 = cursor.fetchall()
        for j in data2:
            temp2["image_id"] = i[0]  # 与image中的id对应
            temp["category_id"] = 1  # 类别id，与categories中的id对应
            temp["id"] = 810975  # 矩形id
            temp["bbox"] = [j[0], j[1],
                            j[2], j[3]]  # [x, y, w, h]
            annotation.append(temp2.copy())

    categories = []
    temp = {}
    for i in range(0, 1):
        temp["supercategory"] = "vehicle"  # 父类别
        temp["id"] = 1  # 类对应的id(0默认为背景)
        temp["name"] = "bicycle"  # 子类别

    parameters = {
        "info": info,
        "images": image,
        "annotations": annotation,
        "categories": categories,
    }
    json_str = json.dumps(parameters, indent=4)

    with open('./file/params.json', 'w') as f:  # 创建一个params.json文件
        f.write(json_str)  # 将json_str写到文件中
    dirpath = "./file/params.json"
    outFullName = "./file/rst.zip"
    zipDir(dirpath, outFullName, taskid)
    data_file = open('./file/rst.zip', 'rb')
    file = data_file
    headers = {"Content-Disposition": "attachment; filename=test.zip;"}
    return Response(file, content_type="application/zip",
                    headers=headers)


# @app.route('/home/move_rec', methods=['GET', 'POST'])
# def move_rec():
#     id = request.form.get("pictureid")
#     x = request.form.get("x")
#     y = request.form.get("y")
#     w = request.form.get("w")
#     h = request.form.get("h")
#     newx = request.form.get("newx")
#     newy = request.form.get("newy")
#     print(id)
#     try:
#         cursor.execute(
#                 "update recinfo set x=%s,y=%s where pictureid=%s and x=%s and y=%s and w=%s and h=%s", (newx, newy, id, x, y, w, h)
#             )
#         db.commit()
#         print("move success!")
#         return "success!"
#     except Exception as e:
#         print(e)
#         return "-1"


# @app.route('/home/resize_rec', methods=['GET', 'POST'])
# def resize_rec():
#     id = request.form.get("pictureid")
#     print(id)
#     try:
#         cursor.execute(
#                 "select w,h,x,y from recinfo where id=%s", (id)
#             )
#         data = cursor.fetchall()
#         temp = {}
#         result = []
#         if data is not None:
#             for i in data:
#                 temp["w"] = i[0]
#                 temp["h"] = i[1]
#                 temp["x"] = i[2]
#                 temp["y"] = i[3]
#                 result.append(temp.copy())  # 特别注意要用copy，否则只是内存的引用
#         return jsonify(result)
#     except Exception as e:
#         print(e)
#         return "-1"


# @app.route('/home/delete_rec', methods=['GET', 'POST'])
# def delete_rec():
#     id = request.form.get("pictureid")
#     print(id)
#     try:
#         cursor.execute(
#                 "select w,h,x,y from recinfo where id=%s", (id)
#             )
#         data = cursor.fetchall()
#         temp = {}
#         result = []
#         if data is not None:
#             for i in data:
#                 temp["w"] = i[0]
#                 temp["h"] = i[1]
#                 temp["x"] = i[2]
#                 temp["y"] = i[3]
#                 result.append(temp.copy())  # 特别注意要用copy，否则只是内存的引用
#         return jsonify(result)
#     except Exception as e:
#         print(e)
#         return "-1"
# @app.route('/testimg')
# def shapeNchange():
#     resultant = searchShapeNchange.return_img_stream("./static/photo/test.jpg")
#     #searchSapeNchange返回的结果，也就是resultant存放的数据是['/static/airplanes/image_0014.jpg', '/static/airplanes/image_0016.jpg', '/static/airplanes/image_0018.jpg', '/static/airplanes/image_0021.jpg', '/static/airplanes/image_0048.jpg']
#     return render_template('resultShapeNchange.html', resultant = resultant)


# 程序一开始运行的入口，0.0.0.0指任意地址，port是后端服务器提供服务的接口
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=2333)
    db.close()
    print("backend close")
