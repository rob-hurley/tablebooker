# Configure the Azure Provider
provider "azurerm" { }

# Create a resource group
resource "azurerm_resource_group" "tablebooker" {
  name     = "tablebooker-resourcegroup"
  location = "eastus"
  tags {
        environment = "Terraform For TableBooker"
  }
}

# Create a virtual network within the resource group

resource "azurerm_virtual_network" "tablebookernetwork" {
  name                = "tablebooker-network"
  address_space       = ["10.0.0.0/16"]
  location            = "${azurerm_resource_group.network.location}"
  resource_group_name = "${azurerm_resource_group.network.name}"

  tags {
        environment = "Terraform For TableBooker"
  }

}

resource "azurerm_subnet" "tablebookersubnet" {
    name                 = "TablebookerSubnet"
    resource_group_name  = "${azurerm_resource_group.tablebooker.name}"
    virtual_network_name = "${azurerm_virtual_network.tablebookernetwork.name}"
    address_prefix       = "10.0.2.0/24"
}

resource "azurerm_public_ip" "tablebookerpublicip" {
    name                         = "tablebooker-IP"
    location                     = "eastus"
    resource_group_name          = "${azurerm_resource_group.tablebooker.name}"
    public_ip_address_allocation = "dynamic"

    tags {
        environment = "Terraform For TableBooker"
    }
}

resource "azurerm_network_security_group" "tablebookersecuritygroup" {
    name                = "tablebooker-securitygroup"
    location            = "eastus"
    resource_group_name = "${azurerm_resource_group.tablebooker.name}"
    ;
    security_rule {
        name                       = "SSH"
        priority                   = 1001
        direction                  = "Inbound"
        access                     = "Allow"
        protocol                   = "Tcp"
        source_port_range          = "*"
        destination_port_range     = "22"
        source_address_prefix      = "*"
        destination_address_prefix = "*"
    }
    security_rule {
        name                       = "HTTP"
        priority                   = 1001
        direction                  = "Inbound"
        access                     = "Allow"
        protocol                   = "Tcp"
        source_port_range          = "*"
        destination_port_range     = "80"
        source_address_prefix      = "*"
        destination_address_prefix = "*"
    }

    tags {
        environment = "Terraform For TableBooker"
    }
}

resource "azurerm_network_interface" "tablebookervnic" {
    name                = "tablebooker-vnic"
    location            = "eastus"
    resource_group_name = "${azurerm_resource_group.tablebooker.name}"

    ip_configuration {
        name                          = "tablebookerVNIC"
        subnet_id                     = "${azurerm_subnet.tablebookersubnet.id}"
        private_ip_address_allocation = "dynamic"
        public_ip_address_id          = "${azurerm_public_ip.tablebookerpublicip.id}"
    }

    tags {
        environment = "Terraform For TableBooker"
    }
}

resource "azurerm_virtual_machine" "tablebookervm" {
    name                  = "tablebooker-VM"
    location              = "eastus"
    resource_group_name   = "${azurerm_resource_group.tablebooker.name}"
    network_interface_ids = ["${azurerm_network_interface.tablebookervnic.id}"]
    vm_size               = "Standard_DS1_v2"

    storage_os_disk {
        name              = "myOsDisk"
        caching           = "ReadWrite"
        create_option     = "FromImage"
        managed_disk_type = "Premium_LRS"
    }

    storage_image_reference {
        publisher = "Canonical"
        offer     = "UbuntuServer"
        sku       = "16.04.0-LTS"
        version   = "latest"
    }

    os_profile {
        computer_name  = "tablebookervm01"
        admin_username = "azureuser"
    }

    os_profile_linux_config {
        disable_password_authentication = true
        ssh_keys {
            path     = "/home/azureuser/.ssh/authorized_keys"
            key_data = "ssh-rsa AAAAB3Nz{snip}hwhqT9h"
        }
    }


    tags {
        environment = "Terraform For TableBooker"
    }
}