import os
import subprocess
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = "Manage frontend's node package modules"

    def add_arguments(self, parser):
        parser.add_argument(
            'action', nargs='?', default='install', type=str,
            help='Specify the action to perform (e.g., "install", "uninstall", "update")'
        )
        parser.add_argument(
            'package_name', nargs='?', default=None, type=str,
            help='Specify the name of the package (optional for "install" and "update" actions)'
        )

    def handle(self, *args, **options):
        action = options['action']
        package_name = options['package_name']
        
        actions = {
            'install': self.install_node_package,
            'uninstall': self.uninstall_node_package,
            'update': self.update_node_packages,
            'start': self.start_react_app,
            'build': self.build_react_app,
            'serve': self.serve_frontend
        }

        if action not in actions:
            raise CommandError(f"Unknown action: {action}")

        actions[action](package_name) if package_name else  actions[action]()

    def change_directory_to_frontend(self):
        os.chdir('frontend')

    def execute_command(self, command):
        subprocess.run(command, shell=True)

    def install_node_package(self, package_name=None):
        self.change_directory_to_frontend()
        if package_name:
            command = f'npm install {package_name}'
        else:
            command = 'npm install'
        self.execute_command(command)
        self.stdout.write(self.style.SUCCESS("Node package installed successfully."))

    def uninstall_node_package(self, package_name):
        self.change_directory_to_frontend()
        command = f'npm uninstall {package_name}'
        self.execute_command(command)
        self.stdout.write(self.style.SUCCESS(f"Node package '{package_name}' uninstalled successfully."))


    def update_node_packages(self):
        self.change_directory_to_frontend()
        command = 'npm update'
        self.execute_command(command)
        self.stdout.write(self.style.SUCCESS("Node packages updated successfully."))

    def start_react_app(self):
        self.change_directory_to_frontend()
        command = 'npm start'
        self.execute_command(command)

    def build_react_app(self):
        self.change_directory_to_frontend()
        command = 'npm run build'
        self.execute_command(command)
        self.stdout.write(self.style.SUCCESS("Your frontend built successfully."))

    def serve_frontend(self):
        self.change_directory_to_frontend()
        command = 'serve -s build'
        self.execute_command(command)
