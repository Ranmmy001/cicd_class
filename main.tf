terraform {
  required_providers {
    aws = {

    }
  }
}
provider "aws" {
    region = "us-east-1"
      
}

resource "aws_security_group" "ssh" {
    name = "ssh"
    description = "security group for ssh"
    ingress {
        description = "ssh for ingress"
        protocol = "tcp"
        from_port = 22
        to_port = 22
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        description = "ssh for egress"
        protocol = "-1"
        from_port = 0
        to_port = 0
        cidr_blocks = ["0.0.0.0/0"]
    }
}
resource "aws_security_group" "http" {
    name = "http"
    description = "security group for http"
    ingress {
        description = "http for ingress"
        protocol = "tcp"
        from_port = 80
        to_port = 80
        cidr_blocks = ["0.0.0.0/0"]
    }
    egress {
        description = "http for egress"
        protocol = "-1"
        from_port = 0
        to_port = 0
        cidr_blocks = ["0.0.0.0/0"]
    }
}
resource "aws_key_pair" "sshKey" {
    key_name = "sshKey"
    public_key = file("${path.root}/sshKey.pub")
}
resource "aws_instance" "alarm_instance" {
    ami = "ami-053b0d53c279acc90"
    instance_type = "t3.micro"
    vpc_security_group_ids = [aws_security_group.ssh.id, aws_security_group.http.id]
    key_name = aws_key_pair.sshKey.key_name
    
    tags = {
      "Name" = "alarm_instance" 
    }

    provisioner "remote-exec" {
        when = create
        script = "${path.root}/install_docker.sh"
        connection {
            private_key = file("${path.root}/sshKey")
            type = "ssh"
            user = "ubuntu"
            host = self.public_ip
        }
    }
}

output "ip_address" {
  value = aws_instance.alarm_instance.public_ip
  
}
